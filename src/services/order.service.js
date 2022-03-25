const {Order, validate} = require("../models/Order");
const Utils = require("../utils/Utils");
const DAOOrder = require("../Entities/DAOOrders");
const {SuccessResponse, ErrorResponse} = require("../models/Responses");
const constants = require("../utils/Constants");
const nodemailer = require('nodemailer');



const createOrder = (body) => new Promise((resolve, reject) => {
    let order = Order.from(body)
    order.id = Utils.generateId()
    order.total = order.products.reduce((total, index) => {return total + index.item.price}, 0)
    if(validate(order)){
        let orderParsed = Utils.parseObjects(order)
        DAOOrder.saveOrder(orderParsed).then(res =>{

            const successResponse = new SuccessResponse(200, res, order.id);
            sendEmail(order.id.toString(), order.name.toString(), order.email);
            resolve(successResponse);
        }).catch(error => {
            const errorResponse = new ErrorResponse(500, error);
            reject(errorResponse)
        })
    }else{
        const errorResponse = new ErrorResponse(400, constants.BAD_REQUEST);
        reject(errorResponse)
    }
})

const sendEmail = (idPedido, nombre, email) => new Promise(((resolve, reject) => {

    const mailTransport = nodemailer.createTransport({
        host: "smtpout.secureserver.net",
        secure: true,
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
            ciphers:'SSLv3'
        },
        requireTLS:true,
        port: 465,
        debug: true,
        auth: {
            user: "admin@highsuccess.com.mx",
            pass: "Gamos1588"
        }
    });

    var mailOptions = {
        from: 'admin@highsuccess.com.mx',
        to: email,
        subject: 'Sending Email using Node.js',
        html:  `<div style="padding: 5px">
    <div style="padding: 10px 50px 10px 50px; border: 1px solid black;">
        <div>
            <h1 style=" text-align: center;">HIGH SUCCESS</h1>
        </div>
        <div>
            <h3>Gracias por tu compra!</h3>
        </div>
        <div>
            <p style="text-align: justify;">Hemos recibido tru pedido, estás a unos pasos de tener tu prenda!. 
                Por el momento no contamos con pago en línea (estará listo más pronto de lo que te imaginas!) es por ello que te pedimos realices tu pago en algún bancon con las siguientes referencias: 
            </p>
            <p>
                IDPedido: ${idPedido} <br>
                Nombre: ${nombre}
            </p>
            <p>O en un Oxxo y nos mandes una foto de tu recibo y nosotros lo validaremos. En cuanto tengamos tu comprobante te notificaremos el estatus de envío.</p>
            <p>High Success!</p>
        </div>
    </div>
</div>`
    };

    mailTransport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}))

const updateOrder = (body) => new Promise((resolve, reject) => {
    let order = Order.from(body)
    if (order.id !== undefined) {
        let orderParsed = Utils.parseObjects(order)
        DAOOrder.updateOrder(orderParsed).then(res =>{
            const successResponse = new SuccessResponse(200, res);
            resolve(successResponse);
        }).catch(error => {
            const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
            reject(errorResponse)
        })
    }else{
        const errorResponse = new ErrorResponse(500, constants.BAD_REQUEST);
        reject(errorResponse)
    }
})

const updateStatusOrders = (id, idStatus) => new Promise(async (resolve, reject) => {

    let orderParsed = await DAOOrder.listOrderById(id)
    orderParsed = handleStatus(orderParsed, idStatus)
    DAOOrder.updateOrder(orderParsed).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500, constants.ERROR_UPDATING);
        reject(errorResponse)
    })
})

const handleStatus = (order,statusId) => {
    order.status = parseInt(statusId);
    return order
}

const listOrder = () => new Promise((resolve, reject) => {

    DAOOrder.listOrder().then(res =>{
        let result = []
        res.forEach(doc => {
            result.push(doc.data())
        });
        const successResponse = new SuccessResponse(200, constants.SUCCESS,result);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const listOrderById = (id) => new Promise((resolve, reject) => {

    DAOOrder.listOrderById(id).then(res =>{
        const successResponse = new SuccessResponse(200, constants.SUCCESS,res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const listOrderByKeyValue = (key, value) => new Promise((resolve, reject) => {

    DAOOrder.listOrderByKeyValue(key, value).then(res => {
        let result = []
        res.forEach(doc => {
            result.push(doc.data())
        });
        const successResponse = new SuccessResponse(200, constants.SUCCESS,result);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

const deleteOrder = (id) => new Promise((resolve, reject) => {

    DAOOrder.deleteOrder(id).then(res =>{
        const successResponse = new SuccessResponse(200, res);
        resolve(successResponse);
    }).catch(error => {
        const errorResponse = new ErrorResponse(500,error.toString());
        reject(errorResponse)
    })
})

module.exports = {
    createOrder,
    updateOrder,
    listOrder,
    listOrderById,
    deleteOrder,
    listOrderByKeyValue,
    updateStatusOrders
}

