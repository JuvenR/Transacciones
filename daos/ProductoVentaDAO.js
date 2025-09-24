import { pool } from '../config/db.js';

export class ProductoVentaDAO {
    static async crear(data) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // Usa los nombres correctos de data
            const subtotal = data.cantidadVendida * data.precioventa;

            const [insertResult] = await conn.query(
                `INSERT INTO productoventa 
                (venta_id, producto_id, cantidadVendida, subtotal, precioventa) 
                VALUES (?, ?, ?, ?, ?)`,
                [data.venta_id, data.producto_id, data.cantidadVendida, subtotal, data.precioventa]
            );

            await conn.query(
                `UPDATE producto
                SET cantidad = cantidad - ?
                WHERE id = ? AND cantidad >= ?`,
                [data.cantidadVendida, data.producto_id, data.cantidadVendida]
            );

            await conn.commit();

            return { insertId: insertResult.insertId, subtotal };
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    static async obtenerPorVenta(venta_id) {
        const sql = 'SELECT * FROM productoventa WHERE venta_id=?';
        const [rows] = await pool.execute(sql, [venta_id]);
        return rows;
    }

    static async eliminar(id) {
        const sql = 'DELETE FROM productoventa WHERE id = ?';
        const [result] = await pool.execute(sql, [id]);
        return result.affectedRows;
    }
}
