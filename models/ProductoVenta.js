export class ProductoVenta {
    constructor({id, venta_id,  producto_id, cantidadVendida, subtotal, precioventa}){
        this.id=id;
        this.venta_id=venta_id;
        this.producto_id=producto_id;
        this.cantidadVendida=cantidadVendida;
        this.subtotal=subtotal;
        this.precioventa=precioventa;
    }
}