module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("jobs",  {
        jobId: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        joblocation: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        jobstatus:{
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.STRING
        },
        tag1: {
            type: Sequelize.STRING
        },
        tag2: {
            type: Sequelize.STRING
        },
        county: {
            type:Sequelize.STRING
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        }
    }, {
         //dont add the timestamp attributes
        timestamps: false,

        //disables the createdat auto feature in the create sql
        createdAt: false,

        //disables the updateat feature in the create sql
        updatedAt: false,
    })

    return Job;
}