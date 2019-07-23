const router = require("express").Router();

router.use("/usuarios", require("./usuarios"));
router.use("/clientes", require("./clientes"));
router.use("/lojas", require("./lojas"));

router.use("/categorias", require("./categorias"));
router.use("/produtos", require("./produtos"));
router.use("/avaliacoes", require("./avaliacoes"));
router.use("/variacoes", require("./variacoes"));

router.use("/pedidos", require("./pedidos"));
router.use("/entregas", require("./entregas"));
router.use("/pagamentos", require("./pagamentos"));

module.exports = router;