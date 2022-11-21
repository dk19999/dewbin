import { Paste, QueryResolvers } from "../../generated/graphql";
import PasteModel from "../../models/paste";

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
        // if(currentDate >= paste.)
        if(paste && paste.expireAt<=currentDate){
            await PasteModel.findOneAndRemove({link});
            return null

        }
        return paste 
    }
}

export default Query;