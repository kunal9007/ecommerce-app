const requiredEnvs = [
    'NODE_ENV',
    'PORT',
    'MONGO_DB_URL',
    'JWT_USER_SECRET'
];

requiredEnvs.forEach((v) => {
    if (typeof process.env[v] === undefined) throw new Error(`Environment variable ${v} is missing`);
});

module.exports = {
    'NODE_ENV': process.env.NODE_ENV,
    'PORT': process.env.PORT,

    'MONGO_DB_URL': process.env.MONGO_DB_URL,
    'JWT_SECRET': process.env.JWT_SECRET
};
