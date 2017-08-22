import * as supertest from 'supertest'
import app from '../App'

describe('App', () => {
  it('works', () =>
    supertest(app)
      .get('/')
      .expect(200)
  )
})
