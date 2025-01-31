import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

export const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 4,
        max: 25,
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      values: ['admin', 'customer', 'employee'],
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Ticket = sequelize.define(
  'Ticket',
  {
    title: {
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING,
    },
    description: {
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      values: ['todo', 'inprogress', 'completed'],
    },
    createdBy: {
      // TODO: key here for user?
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    assignedUser: {
      // TODO: key here for user?
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = sequelize.define('Comment', {
  message: DataTypes.STRING,
  ticketId: {
    type: DataTypes.STRING,
    // TODO: add primary key stuff here
  },
  user: {
    type: DataTypes.STRING,
    // TODO: add key stuff here?
  },
});

export const Event = sequelize.define('Event', {
  user: DataTypes.STRING,
  timestamp: DataTypes.DATE,
  description: DataTypes.STRING,
});

export const seed = async () => {
  try {
    const admin = await User.create(
      {
        username: 'admin',
        password: 'admin',
        role: 'admin',
      },
      {
        ignoreDuplicates: false,
      }
    );
    if (admin) {
      console.log('Admin created');
    } else {
      console.log('Admin already created')
    }
  } catch (err) {}
};
