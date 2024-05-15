describe.only('API tests', () => {
    it.only('Should get the weather information for London', () => {
        cy.request({
            method: 'GET',
            url: 'https://open-weather13.p.rapidapi.com/city/london/EN',
            headers: {
                'X-RapidAPI-Key': 'c1ab03d992msh2f3093fe336477bp15c2e5jsn4500773b0fca',
                'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
            }).then((response) =>{
                expect(response.status).to.eq(200);
                
                expect(response.body).to.have.property('weather');
                expect(response.body.name).to.be.eq('London');
        })
    });

    it.only('Should return error message when city parameter is invalid', () => {
        cy.request({
            method: 'GET',
            url: 'https://open-weather13.p.rapidapi.com/city/234/EN',
            headers: {
                'X-RapidAPI-Key': 'c1ab03d992msh2f3093fe336477bp15c2e5jsn4500773b0fca',
                'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
            }).then((response) =>{
                expect(response.status).to.eq(200);
                
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.eq('city not found');
                expect(response.body.cod).to.be.eq('404');
        })
    });

    it.only('Should return 403 when the API key is invalid', () => {
        cy.request({
            method: 'GET',
            url: 'https://open-weather13.p.rapidapi.com/city/london/EN',
            failOnStatusCode: false,
            headers: {
                'X-RapidAPI-Key': 'invalidkey',
                'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
            }).then((response) =>{
                expect(response.status).to.eq(403);
                expect(response.body).to.have.property('message');
                expect(response.body.message).to.be.eq('You are not subscribed to this API.');
        })
    });

    it.only('Should return 400 when the API key is invalid', () => {
        cy.request({
            method: 'GET',
            url: 'https://open-weather13.p.rapidapi.com/city/london/EN',
            failOnStatusCode: false,
            headers: {
                'X-RapidAPI-Key': 'c1ab03d992msh2f3093fe336477bp15c2e5jsn4500773b0fca',
                'X-RapidAPI-Host': 'invalidhost'
            }
            }).then((response) =>{
                expect(response.status).to.eq(400);
        })
    });
});

//You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/worldapi/api/open-weather13