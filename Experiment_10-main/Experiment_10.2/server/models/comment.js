export default (sequelize) => {
  const { DataTypes } = await import('sequelize');
  return sequelize.define("Comment", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
  }, { timestamps: true });
};
