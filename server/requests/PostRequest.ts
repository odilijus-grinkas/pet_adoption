const { body, validationResult } = require("express-validator");
import express from "express"

export const createValidation = [
    body("city_id")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("city_id laukelis negali būti tuščias")
        .isInt().
        withMessage("city_id turi būti skaičius"),
    body("species_id")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("species_id laukelis negali būti tuščias")
        .isInt().
        withMessage("species_id turi būti skaičius"),
    body("pet_name")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("name laukelis negali būti tuščias")
        .isLength({ min: 3 })
        .withMessage("vardas yra pertrumpas")
        .isLength({ max: 30 })
        .withMessage("vardas yra perilgas"),
    body("description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("description laukelis negali būti tuščias"),
    body("status")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("status laukelis negali būti tuščias")
        .isLength({ max: 10 })
        .withMessage("status yra perilgas"),
];

export const updateValidation = [
    body("city_id")
        .trim()
        .escape()
        .optional()
        .isInt().
        withMessage("city_id turi būti skaičius"),
    body("species_id")
        .trim()
        .escape()
        .optional()
        .isInt().
        withMessage("species_id turi būti skaičius"),
    body("pet_name")
        .trim()
        .escape()
        .optional()
        .isLength({ min: 3 })
        .withMessage("vardas yra pertrumpas")
        .isLength({ max: 30 })
        .withMessage("vardas yra perilgas"),
    body("description")
        .trim()
        .escape()
        .optional()
        .notEmpty().withMessage("status negali būti tuščias"),
    body("status")
        .trim()
        .escape()
        .optional()
        .isLength({ max: 10 })
        .withMessage("status yra perilgas")
        .notEmpty().withMessage("status negali būti tuščias")
];

export const postValidation = (req: express.Request) => {
    let valid = true;
    const messages = [];

    const validacija = validationResult(req);

    const post = req.body;

    if (!validacija.isEmpty()) {
        for (let i of validacija.array()) {
            messages.push(i.msg);
        }
        valid = false;
    }

    return [post, valid, messages];
};
