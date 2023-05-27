export default interface D1Error extends Error {
    cause: D1Error;
};
