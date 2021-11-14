module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.NUMBER
        },
        location: {
            type: Sequelize.STRING
        },
        usertype: {
            type: Sequelize.STRING
        }
    }, {
        //dont add the timestamp attributes
        timestamps: false,

        //disables the createdat auto feature in the create sql
        createdAt: false,

        //disables the updateat feature in the create sql
        updatedAt: false,
    });
    
    return User;
}