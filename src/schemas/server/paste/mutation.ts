import UnusedKeyModel from "../../../models/unused-key";
import UsedKeyModel from "../../../models/used-key";
import PasteModel from "../../../models/paste";
import { MutationResolvers, Paste } from "../../../generated/server-graphql";

function addHours(numOfHours: number, date = new Date()) {
  console.log("🚀 ~ file: mutation.ts ~ line 6 ~ addHours ~ date", date);
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

const PasteMutation: MutationResolvers = {
  pasteCreate: async (_, { input }, { db }) => {
    const { title, body, syntaxLanguage, expiration, exposure } = input;
   
    try {
      let paste:Partial<Paste> = { title, body, syntaxLanguage };

      if (expiration) {
        paste["expireAt"]  = addHours(+expiration)
      }

      if (exposure) {
        paste["exposure"] = exposure;
      }
      console.log("🚀 ~ file: mutation.ts ~ line 27 ~ pasteCreate: ~ paste", paste)
      const link = await UnusedKeyModel.findOne({});
      if (!link) {
        throw new Error("");
      }

      await UnusedKeyModel.findOneAndRemove(link);
      await UnusedKeyModel.create({ value: link.value });
      await UsedKeyModel.find({});

      paste["link"] = link.value;
      const createdPaste = await PasteModel.create(paste);
    
      return createdPaste;
    } catch (error) {
      console.log("🚀 ~ file: index.ts ~ line 51 ~ error", error);
    }
  },
  pasteUpdate: async (_, { input }, { db }) => {
    const { link, ...restInput } = input;
    if (!link) return null;
    let pasteFound = await PasteModel.findOneAndUpdate({ link }, restInput, {
      new: true,
    });
    if (!pasteFound) return null;
    return pasteFound;

  },
  pasteDelete: async (_, { link }, { db }) => {
    try {
      const paste = await PasteModel.findOne({ link }, );
      if(!paste){
        throw Error('error')
      }
      paste.isDeleted = true;
      await paste.save()
      console.log("🚀 ~ file: mutation.ts ~ line 75 ~ paste", paste);
      return true
    } catch (err) {
      return false;
    }
  },
};

export default PasteMutation;
