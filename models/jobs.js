module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("jobs",  {
     
        jobId: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultvalue: null
        },
        latitude: {
            type: Sequelize.STRING
        },
        longitude: {
            type: Sequelize.STRING
        },
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultvalue: null
        },
        rating: {
            type: Sequelize.INTEGER
        },
        num_reviews: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.INTEGER
        },
        joblocation: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        website: {
            type: Sequelize.STRING
        },
        jobstatus:{
            type: Sequelize.STRING
        },
        county_name: {
            type:Sequelize.STRING
        },
        
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