"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear existing categories
        yield prisma.category.deleteMany({});
        // Create categories with subcategories
        const categories = [
            {
                name: 'Sanitary Fittings',
                subCategory: ['Basin Taps', 'Kitchen Taps', 'Shower Heads', 'Soap Dispensers']
            },
            {
                name: 'Brass Hardware',
                subCategory: ['Door Handles', 'Hinges', 'Brackets', 'Fasteners']
            },
            {
                name: 'Pipe Fittings',
                subCategory: ['Elbow Joints', 'T-Joints', 'Unions', 'Couplers']
            },
            {
                name: 'Bathroom Accessories',
                subCategory: ['Towel Racks', 'Mirrors', 'Cabinets', 'Shelves']
            },
            {
                name: 'Water Systems',
                subCategory: ['Valves', 'Reducers', 'Filters', 'Check Valves']
            }
        ];
        for (const category of categories) {
            yield prisma.category.create({
                data: category
            });
        }
        console.log('✅ Categories seeded successfully!');
    });
}
main()
    .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
