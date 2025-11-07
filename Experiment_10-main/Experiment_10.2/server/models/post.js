export default (sequelize) => {
  const { DataTypes } = await import('sequelize');
  return sequelize.define("Post", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    imageUrl: { type: DataTypes.STRING },
  }, { timestamps: true });
};
