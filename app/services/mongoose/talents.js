const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./image");

const { NotFoundError, BadRequestError } = require("../../errors/index");

const getAllTalents = async (req) => {
  const { keyword } = req.query;
  console.log(req.user.organizer);
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
    // mencari nama yang mengandung keyword dan case insensitive
    // spread operator ...condition dibuat untuk mengantisipasi ada perubahan dan penambahan kondisi dimasa depan
  }

  const result = await Talents.find(condition)
    .populate({
      //mengganti field image dengan data lengkap berdasarkan id yang dimasukkan dalam field image
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalent = async (req) => {
  const { name, role, image } = req.body;

  if (!name && !image) throw new BadRequestError("Please input name and image");

  await checkingImage(image);
  const check = await Talents.findOne({ name, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Talent has been registered");

  const result = await Talents.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id url",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`Talent with id: ${id} not found`);

  return result;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id }, //$ne: id digunakan untuk mengecualikan diri sendiri dalam pencarian, berguna jika ingin mengupdate field lain dan membiarkan field name sama
  });

  if (check) throw new BadRequestError("Talent has been registered");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Talent with id: ${id} not found`);

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;

  const result = await Talent.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Talent id ${id} not found`);

  await Talent.findByIdAndDelete(id);

  return result;
};

const checkingTalent = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Talent with id ${id} not found`);
  return result;
};

module.exports = {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
  checkingTalent,
};
