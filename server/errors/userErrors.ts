/**
 * Error codes for users logic. Every time a new error is sent as a response
 * to the client, it should have a NEW, UNIQUE error code - meaning you should add one
 * to this enum.
 *
 * Every code in this enum should only be used ONCE - it is a unique identifier!
 */

const USER_ERR = {
    USER001: 'USER001',
};

Object.freeze(USER_ERR);

export default USER_ERR;