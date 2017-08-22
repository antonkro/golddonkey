import * as sinon from 'sinon'
import * as chai from 'chai'
import * as sinonChai from 'sinon-chai'

before(function () {
    chai.use(sinonChai)
})

beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
    this.sandbox.restore()
})