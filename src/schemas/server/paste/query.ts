import { Paste, QueryResolvers } from "../../../generated/server-graphql";
import PasteModel from "../../../models/paste";

const Query:QueryResolvers = {
    pastes:async (_, __, {db}) => {
        const pastes = await PasteModel.find({});
        console.log("🚀 ~ file: query.ts ~ line 8 ~ pastes: ~ pastes", pastes)
        return pastes;
    },
    paste:async (parent, args, {db}) => {
        const {link} = args
        console.log("🚀 ~ file: query.ts ~ line 12 ~ paste: ~ link", link)
        const currentDate = new Date()
        console.log("🚀 ~ file: query.ts ~ line 14 ~ paste: ~ currentDate", currentDate)
        const paste:Paste | null = await PasteModel.findOne({link});
        console.log("🚀 ~ file: query.ts ~ line 16 ~ paste: ~ paste", paste)
        // if(currentDate >= paste.)
        if(paste && paste.expireAt<=currentDate){
            console.log("🚀 ~ file: query.ts ~ line 18 ~ paste: ~ paste.expireAt", paste.expireAt)
            await PasteModel.findOneAndRemove({link});
            return null

        }
        return paste 
    }
}

export default Query;