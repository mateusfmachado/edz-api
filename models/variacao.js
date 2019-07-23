const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VariacaoSchema = Schema({
    codigo: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    promocao: { type: Number },
    fotos: { type: Array, default: [] },
    entrega: {
        type: {
            dimensoes: {
                type: {
                    alturaCm: { type: Number },
                    larguraCm: { type: Number },
                    profundidadeCm: { type: Number }
                },
                required: true
            },
            pesoKg: { type: Number, required: true },
            freteGratis: { type: Boolean, default: false }
        }
    },
    quantidade: { type: Number, default: 0 },
    quantidadeBloqueada: { type: Number, default: 0 },
    produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
    loja:  { type: Schema.Types.ObjectId, ref: "Loja", required: true }
},{ timestamps: true });

module.exports = mongoose.model("Variacao", VariacaoSchema);