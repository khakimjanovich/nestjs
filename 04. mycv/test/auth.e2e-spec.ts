import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/bootstrap/app.module";
import {response} from "express";

describe('Authentication System (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should handles register request', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({email: 'admin3@admin.com', password: 'password'})
            .expect(201)
            .then(response => {
                const {id, email} = response.body;
                expect(id).toBeDefined();
                expect(email).toEqual('admin3@admin.com');
            })
    });

    it('should return currently logged in user once the user is signed up', async function () {
        const email = 'admin@admin.com';
        const res = await request(app.getHttpServer())
            .post('/auth/register')
            .send({email, password: 'password'})
            .expect(201)

        const cookie = res.get('Set-Cookie');

        const {body} = await request(app.getHttpServer())
            .get('/auth/me')
            .set('Cookie', cookie)
            .expect(200)

        expect(body.email).toEqual(email)
    });
});
