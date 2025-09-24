import { ProductoDAO } from './daos/ProductoDAO.js'; 
import { VentaDAO } from './daos/VentaDAO.js';
import { ProductoVentaDAO } from './daos/ProductoVentaDAO.js';
import { pool } from './config/db.js';

async function runTestsProduct() {
    console.log('========== PRUEBAS PRODUCTO ==========\n');

    const prod = await ProductoDAO.crear({ nombre: 'Laptop', precio: 15000, cantidad: 10 });
    console.log('Producto creado:', prod);

    const prod2 = await ProductoDAO.crear({ nombre: 'Laptop', precio: 15000, cantidad: 10 });
    console.log('Producto creado:', prod2);

    const productos = await ProductoDAO.obtenerTodos();
    console.log('\nLista de productos:', productos);

    await ProductoDAO.actualizar({ id: prod.id, nombre: 'Laptop Gamer', precio: 18000, cantidad: 8 });
    const productoActualizado = await ProductoDAO.obtenerPorId(prod.id);
    console.log('\nProducto actualizado:', productoActualizado);

    await ProductoDAO.eliminar(prod2.id);
    const productosFinal = await ProductoDAO.obtenerTodos();
    console.log('\nProductos finales:', productosFinal);
}

async function runTestsVenta() {
    console.log('\n========== PRUEBAS VENTA ==========\n');

    const venta = await VentaDAO.crear({ total: 0, iva: 0, fecha: new Date() });
    console.log('Venta creada:', venta);

    const ventas = await VentaDAO.obtenerTodos();
    console.log('\nLista de ventas:', ventas);

    await VentaDAO.actualizar({ id: venta.id, total: 2000, iva: 320, fecha: new Date() });
    const ventaActualizada = await VentaDAO.obtenerPorId(venta.id);
    console.log('\nVenta actualizada:', ventaActualizada);

    await VentaDAO.eliminar(venta.id);
    const ventasFinal = await VentaDAO.obtenerTodos();
    console.log('\nVentas finales:', ventasFinal);
}

async function runTestsProductVenta() {
    console.log('\n========== PRUEBAS PRODUCTO-VENTA ==========\n');

    const p = await ProductoDAO.crear({ nombre: 'Mouse', precio: 500, cantidad: 20 });
    const v = await VentaDAO.crear({ total: 0, iva: 0, fecha: new Date() });

    const pv = await ProductoVentaDAO.crear({
        venta_id: v.id,
        producto_id: p.id,
        cantidadVendida: 2,
        subtotal: 1000,
        precioventa: 500
    });
    console.log('ProductoVenta creado:', pv);

    const listaPV = await ProductoVentaDAO.obtenerPorVenta(v.id);
    console.log('\nLista ProductoVenta por venta:', listaPV);
}

// Ejecutar todas las pruebas en orden
(async () => {
    try {
        await runTestsProduct();
        await runTestsVenta();
        await runTestsProductVenta();
    } catch (err) {
        console.error('Error en pruebas:', err.message);
    } finally {
        pool.end(); // cerrar la conexión solo una vez
    }
})();
