import { pool } from '../config/db.js';

export class VentaDAO {
    static async crear(venta) {
        const sql = 'INSERT INTO venta (total, iva, fecha) VALUES (?, ?, ?)';
        const params = [venta.total, venta.iva, venta.fecha];
        const [result] = await pool.execute(sql, params);
        return { id: result.insertId, ...venta };
    }

    static async obtenerTodos() {
        const sql = 'SELECT * FROM venta';
        const [rows] = await pool.execute(sql);
        return rows;
    }

    static async obtenerPorId(id) {
        const sql = 'SELECT * FROM venta WHERE id = ?';
        const [rows] = await pool.execute(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async actualizar(venta) {
        const sql = 'UPDATE venta SET total = ?, iva = ?, fecha = ? WHERE id = ?';
        const params = [venta.total, venta.iva, venta.fecha, venta.id];
        const [result] = await pool.execute(sql, params);
        return result.affectedRows > 0;
    }

    static async eliminar(id) {
        const sql = 'DELETE FROM venta WHERE id = ?';
        const [result] = await pool.execute(sql, [id]);
        return result.affectedRows > 0;
    }
}
