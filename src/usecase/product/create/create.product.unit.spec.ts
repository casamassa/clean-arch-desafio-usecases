import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Produto 1",
    price: 10,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for a product create use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrowError(
            "Name is required"
        );
    });

    it("should throw an error when price is less than zero", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "Produto 1";
        input.price = -1;

        await expect(usecase.execute(input)).rejects.toThrowError(
            "Price must be greater than zero"
        );
    });
});