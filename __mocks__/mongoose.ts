export const Schema = function(schema) {
    this.schema = schema
    return {
        index: jest.fn()
    }
}
const mockSave = jest.fn()

const MockModelConstructor = function() {
    return {
        save: mockSave
    }
}

MockModelConstructor.findOne = jest.fn()
MockModelConstructor.prototype.save = jest.fn()
export const model = jest.fn().mockImplementation(function() {
    return MockModelConstructor
})
