const Event = require('../../models/event');
const User = require('../../models/user');
const Recruitment = require('../../models/recruitment');
// const Applicant = require('../../models/applicant');

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        events.map(event => {
        return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event.creator)
        };
        });
        return events;
    } catch (err) {
        throw err;
    }
};

// const user = async userId => {
//     try {
//         const user = await User.findById(userId);
//         return {
//         ...user._doc,
//         _id: user.id,
//         createdEvents: events.bind(this, user._doc.createdEvents)
//         };
//     } catch (err) {
//         throw err;
//     }
// };

const recruitment = async recruitmentId => {
    try {
        const recruitment = await Recruitment.findById(recruitmentId);
        return {
            ...recruitment._doc,
            _id:  recruitment.id,
            position: recruitment.position,
            status: recruitment.status
        };
    } catch (err) {
        throw err;
    }
}


module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return {
                ...event._doc,
                _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event._doc.creator)
                };
            });
        } catch (err) {
           throw err;
        }
    },

    getUserByUsername: async args => {
        try {
            const user = await User.findOne({ username: args.searchUserInput.username });
            if(!user) {
                throw new Error('User not exists');
            }
            return user
        } catch (err) {
            throw err;
         }
    },

    createEvent: async args => {
        const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '5db63fe7e7b9d0134436cc22'
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = {
                ...result._doc,
                _id: result._doc._id.toString(),
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('5db63fe7e7b9d0134436cc22');

            if (!creator) {
                throw new Error('User not found.');
            }
            //creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    createUser: async args => {
        try{
            const existUser = await User.findOne({ username: args.createUserInput.username });
            if(existUser) {
                throw new Error('User exists already.');
            }
            const user = new User({
                username: args.createUserInput.username
            });
            const result = await user.save();
            return { ...result._doc, _id: result.id, username: user.username};
        } catch (err) {
            throw err;
        }
    },

    createRecruitment: async args => {
        try {
            const recruitment = new Recruitment({
                position: args.recruitmentInput.position,
                status: args.recruitmentInput.status
            });
            const result = await recruitment.save();
            return { ...result._doc, position: recruitment.position, status: recruitment.status, timestamps: recruitment.timestamps}
        } catch (err) {
            throw err;
        }
    },

    updateUser: async args => {
        try {
            const user = await User.findOne({ username: args.updateUserInput.username });
            if(!user) {
                throw new Error('User not exists');
            }
            console.log(user.username);
            const updateResult = await user.update(
                {
                    $set: { 
                        nicknames: args.updateUserInput.nicknames,
                        representationNickname: args.updateUserInput.representationNickname,
                        majorPosition: args.updateUserInput.majorPosition,
                        minorPosition:  args.updateUserInput.minorPosition,
                        apiUpdatedAt:  args.updateUserInput.apiUpdatedAt,
                        tiers: args.updateTierInput,
                        recentgames: args.updateGameInput
                    }
                }
            );
            return {...updateResult._doc, username: args.updateUserInput.username,
                representationNickname: args.updateUserInput.representationNickname,
                majorPosition: args.updateUserInput.majorPosition,
                minorPosition:  args.updateUserInput.minorPosition,
                apiUpdatedAt:  args.updateUserInput.apiUpdatedAt,
                tiers: args.updateTierInput,
                recentgames: args.updateGameInput
            };

        } catch (err) {
            throw err;
        }
    }
};