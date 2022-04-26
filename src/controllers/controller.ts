import { Request, Response } from "express";
import { db } from "../db";
import dotenv from "dotenv"
dotenv.config();

export class controller {
    static async getAll(req: Request, res: Response) {
        const { name, market } = req.query;
        if (name && market) {
            db.query(`SELECT cryptocurrensyName, ${market} FROM coins WHERE cryptocurrensyName = ?;`, [name], (err, rows) => {
                if (err) {
                    throw err;
                }
                res.send(rows);
            });
        }
        else if (name) {
            db.query("SELECT * FROM coins WHERE cryptocurrensyName = ?;", [name], (err, rows) => {
                if (err) {
                    throw err;
                }
                res.send(rows);
            });
        }
        else if (market) {
            db.query(`SELECT cryptocurrensyName, ${market} FROM coins;`, (err, rows) => {
                if (err) {
                    throw err;
                }
                res.send(rows);
            });
        }
        else {
            db.query("SELECT * FROM coins;", (err, rows) => {
                if (err) {
                    throw err;
                }
                res.send(rows);
            });
        }
    }
    static async get(req: Request, res: Response) {
        db.query("SELECT * FROM coins WHERE cryptocurrensyName = ?;", [req.params.cryptocurrensyName], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }
    static async deleteAll(req: Request, res: Response) {
        db.query("DELETE FROM coins;", (err) => {
            if (err) {
                throw err;
            }
            res.send("OK");
        });
    }
    static async delete(req: Request, res: Response) {
        db.query("DELETE FROM coins WHERE cryptocurrensyName = ?;", [req.params.cryptocurrensyName], (err) => {
            if (err) {
                throw err;
            }
            res.send("OK");
        });
    }
    static async post(req: Request, res: Response) {
        db.query("INSERT INTO coins SET ?;", [req.body], (err) => {
            if (err) {
                throw err;
            }
            res.send("OK");
        });
    }
    static async update(req: Request, res: Response) {
        db.query("UPDATE coins SET ? WHERE cryptocurrensyName = ?;", [req.body, req.params.cryptocurrensyName], (err) => {
            if (err) {
                throw err;
            }
            res.send("OK");
        });
    }
}