import * as Hub from "../../hub"
import * as winston from "winston"

export class Eventz extends Hub.Action {

    name = "Eventz"
    label = "Eventz"
    iconName = "Eventz/Eventz.png"
    description = "A query to sent to partners on data of an organized event."
    supportedActionTypes = [Hub.ActionType.Query]
    supportedFormats = [Hub.ActionFormat.Json]
    params = []

    async execute(request: Hub.ActionRequest) {
        winston.info(msg:`Form choice: ${request.formParams.values}`)

        await request.streamJson( onRow : (row : {[p:string];any}) => {
            winston.info(JSON.stringify(row))

        }).catch((error) => {
            return new Hub.ActionResponse(fields: {sucess: false, message:`Error! ${error.tostring()}`})
        }

        return new Hub.ActionResponse(fields: {sucess: true})
        }
    
    async form(request: Hub.ActionRequest) {
        const form = new Hub.ActionForm()
        form.fields =[{
            label: "Type of information to share to clients!",
            name: "values",
            required: false,
            type: "select",
            options: [
              {name: "A", label: "Grade A info event"},
              {name: "B", label: "Grade B info event"},
            ],
            default: "A",
        }]
        return form
        }

    }

    Hub.addAction(new JoinAction())