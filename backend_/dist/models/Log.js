"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = require("./User");
class Log extends sequelize_1.Model {
    static associate() {
        Log.belongsTo(User_1.User, { foreignKey: 'user_id', as: 'user' });
    }
}
exports.Log = Log;
Log.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    module: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'Logs',
    modelName: 'Log',
});
Log.belongsTo(User_1.User, { foreignKey: 'user_id', as: 'user' });
exports.default = Log;
