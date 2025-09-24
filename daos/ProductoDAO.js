import { pool } from '../config/db.js';

export class ProductoDAO {

    static async crear(producto) {
        const sql = 'INSERT INTO producto (nombre, precio, cantidad) VALUES (?, ?, ?)';
        const params = [producto.nombre, producto.precio, producto.cantidad];
        try {
            const [result] = await pool.execute(sql, params);
            return { id: result.insertId, ...producto };
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }

    static async obtenerTodos() {
        const sql = 'SELECT * FROM producto';
        try {
            const [rows] = await pool.execute(sql);
            return rows;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    static async obtenerPorId(id) {
        const sql = 'SELECT * FROM producto WHERE id = ?';
        try {
            const [rows] = await pool.execute(sql, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error al obtener producto por id:', error);
            throw error;
        }
    }

    static async actualizar(producto) {
        const sql = 'UPDATE producto SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?';
        const params = [producto.nombre, producto.precio, producto.cantidad, producto.id];
        try {
            const [result] = await pool.execute(sql, params);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    static async eliminar(id) {
        const sql = 'DELETE FROM producto WHERE id = ?';
        try {
            const [result] = await pool.execute(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}
