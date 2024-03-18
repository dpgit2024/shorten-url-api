export const Schema = function(schema) {
    this.schema = schema
    return {
        index: jest.fn()
    }
}
const mockSave = jest.fn()

const MockModelConstructor = function() {
    
}

MockModelConstructor.findOne = jest.fn()
MockModelConstructor.find = jest.fn()
MockModelConstructor.prototype.save = jest.fn()
export const model = jest.fn().mockImplementation(function() {
    return MockModelConstructor
})
