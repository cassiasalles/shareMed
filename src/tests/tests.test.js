const userController = require('../controllers/UserController');
const albumController = require('../controllers/AlbumController');
const documentController = require('../controllers/DocumentController');
const shareController = require('../controllers/ShareController');

test('verificar integridade da listagem de usuários', () => {
    expect(userController.index().status).not.toBe(500);
});

test('verificar integridade da criação de usuários', () => {
    var body = {
		"name": "Fernando Ribeiro",
        "email": "fernando.ribeiro@gmail.com",
		"password": "fernando123",
		"cpf": "77218557058",
        "birth_date": "'1993-11-23'",
		"admin": false,
		"latitude": -23.2616034,
		"longitude": -45.8944638,
        "fk_medical_agreement": 0,
        "fk_illness": [0],
		"albuns": [0]
    };
    var request = {"body": body}
    expect(userController.store(request).status).not.toBe(500);
});

test('verificar integridade da listagem de álbuns', () => {
    var body = {
		"user_id": "617f38d804d04e4fef89f590",
    };
    var request = {"body": body};
    expect(albumController.index(request).status).not.toBe(500);
});

test('verificar integridade da criação de álbuns', () => {
    var body = {
		"user_id": "617f38d804d04e4fef89f590",
        "name": "Novembro/2021",
		"description": "Exames realizados em novembro",
    };
    var request = {"body": body};
    expect(albumController.store(request).status).not.toBe(500);
});

test('verificar integridade do link de compartilhamento de álbum', () => {
    var body = {
		"album_id": "618188f6f40de5800a6dd3e8",
    };
    var request = {"body": body};
    expect(shareController.store(request).status).not.toBe(500);
});

test('verificar integridade da exibição do álbum compartilhado', () => {
    var query = {
		"album_id": "618188f6f40de5800a6dd3e8",
    };
    var request = {"query": query};
    expect(shareController.store(request).status).not.toBe(500);
});



test('verificar integridade da listagem de documentos', () => {
    expect(documentController.status).not.toBe(500);
});

test('verificar integridade da criação de documentos', async () => {    
    var body = {
        "user_id": "617f38d804d04e4fef89f590",
        "album_id": "618188f6f40de5800a6dd3e8",
        "name": "teste segundo documento",
        "description": "testando subir documento 4G",
        "reason": "fazendo um chekup",
        "exam_type": "raio x coluna",
        "document": jest.mock('D:/exame_coluna_cassia.pdf')
    };
    var request = {"body": body};

    expect(documentController.store(request).status).not.toBe(500);
});
