const express = require('express');
const { getCompanies } = require('../lib/database/dbEngine/companyDbEngine');
const { getPermissions } = require('../lib/database/dbEngine/userDbEngine');
const router = express.Router()

const mainRouterName = 'company';
const addRoute = 'company-add';
const tagRouter = 'tag-management';

router.get('/', async (req, res, next) => {
  res.render(mainRouterName, {
    style: mainRouterName,
    companies: await getCompanies(),
  });
});

router.get(`/${addRoute}`, async (req, res, next) => {
  res.render(addRoute, {
    style: addRoute,
    companies: await getCompanies(),
    permissions: await getPermissions(),
  });
});

router.get(`/${tagRouter}`, async (req, res, next) => {
  res.render(tagRouter, {
    style: tagRouter,
    companies: await getCompanies(),
    permissions: await getPermissions(),
  });
});

module.exports = router;