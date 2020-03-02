const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    nome: { type: String, required: true },
    dataDeNascimento: { type: Date, required: true },
    cpf: { type: String, required: true },
    telefones: { type: [{ type: String }] },
    deletado: { type: Boolean, default: false },
    loja: { type: Schema.Types.ObjectId, ref: "Loja", required: true },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            estado: { type: String, required: true },
            CEP: { type: String, required: true }
        },
        required: true
    }
}, { timestamps: true });

ClienteSchema.plugin(mongoosePaginate);

ClienteSchema.index({ nome: "text" });

module.exports = mongoose.model("Cliente", ClienteSchema);