describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
         cy.get('#mail').type('german@dolnikov.ru');// ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
         cy.get('#loginButton').click(); // нажал войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // успешная авторизация
         cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
     })

     it('неверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
        cy.get('#mail').type('german@dolnikov.ru');// ввели верный логин
        cy.get('#pass').type('iLoveqastudio7'); // ввели неверный пароль
        cy.get('#loginButton').click(); // нажал войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // неуспешная авторизация
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
    })

    
    it('верный пароль и неверный логин', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
        cy.get('#mail').type('german@dolnikovv.ru');// ввели неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажал войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // неуспешная авторизация
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
    })

    it('Проверка,что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
        cy.get('#mail').type('germandolnikov.ru');// ввели  логин без @
        cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажал войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // неуспешная авторизация
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
    })

    it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
        cy.get('#forgotEmailButton').click(); // нажал восстановление пароля
        cy.get('#mailForgot').type('german@dolnikov.ru'); // ввели имейл для восстановления
        cy.get('#restoreEmailButton').click(); // нажал отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадения текста
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
    })

    it('проверка на приведение к строчным буквам', function () {
        cy.visit('https://login.qa.studio/'); // зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)') // проверка цвета кнопки восст. пароль
        cy.get('#mail').type('GerMan@Dolnikov.ru');// ввели  логин с большими буквами
        cy.get('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажал войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // неуспешная авторизация
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик и он виден
    })
 })
       
 describe('Проверка покупки нового аватара', function () {                 // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
         cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
         cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
         cy.get('.card_csv').type('125');                             // вводим CVV карты
         cy.get('.card_date').type('1226');                           // вводим срок действия карты
         cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
         cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
     });
 });
