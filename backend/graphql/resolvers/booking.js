const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { transformEvent, transformBooking } = require('./merge')


module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(
                booking => {
                    return transformBooking(booking);
                }
            )
        } catch (err) {
            throw err
        }
    },

    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent,
         }
        );
        const result = await booking.save();
        return transformBooking(result);
    },

    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            if (!booking) {
                throw new Error('Booking not found')
            }
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            if (event) {
                return event;
            }
            throw new Error('Event not found');
        } catch (err) {
            throw err
        }
    }
}