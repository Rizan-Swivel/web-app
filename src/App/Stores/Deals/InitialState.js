/**
 * The initial values for the redux state.
 */
 export const INITIAL_STATE_DEALS = {
  dealsList: [],
  deal: [],
  selectedDealId: null,
  error: null,
  success: null,
  dealDeleteSuccess: false,
  PendingDealData: {},
  pendingDealsList: [],
  offerTypesList: [],
  combinedDealRequestsList: {
    "totalItems": 4,
    "totalPages": 1,
    "page": 0,
    "size": 200,
    "combinedDealRequestList": [
      {
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
          "joinedOn": {
            "milliseconds": 1629728604616,
            "displayDate": "23 Aug 2021",
            "displayDateTime": "23 Aug 2021, 07:53 PM",
            "displayText": "Joined on 23 Aug 2021"
          }
        },
        "numberOfRequests": 5
      },
      {
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "Shoes"
        },
        "brand": {
          "id": "bid-27a5548c-aae2-4e56-8c0e-ec89204083f7",
          "name": "Nike"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Barista",
          "imageUrl": "https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-ca30b49e-bfc2-4258-ac4b-63c746abf55b.png",
        },
        "numberOfRequests": 6
      },
      {
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "Clothing"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Odel",
          "imageUrl": "https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-04216940-227b-4fd9-ba51-79281b127127.jpg",
        },
        "numberOfRequests": 5
      },
      {
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "Computer"
        },
        "brand": {
          "id": "bid-27a5548c-aae2-4e56-8c0e-ec89204083f7",
          "name": "Dell"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Abans",
          "imageUrl": "https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-b1589352-34e9-4c67-8e6f-461191effcee.jpg",
        },
        "numberOfRequests": 2
      }
    ]
  },

dealRequestsListForCombination: {
    "totalItems": 4,
    "totalPages": 4,
    "page": 0,
    "size": 1,
    "requestADeals": [
      {
        "note": "User Ask we Get more pizza for 2000 Rupees",
        "products": "Blouse",
        "offerType": {
          "id": "otid-909ced9d-0066-4a24-96d4-5f924cc7e6b6",
          "name": "Bluk Only"
        },
        "user": {
          "id": "uid-73cdfa91-471e-46d4-a428-f7912cda7f46",
          "name": "John",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        },
        "requestedOn": {
          "milliseconds": 1633342358839,
          "displayDate": "01 Oct 2021",
          "displayDateTime": "04 Oct 2021, 03:42 PM",
          "displayText": "25 minutes ago"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        }
      },
      {
        "note": "User Ask we Get more pizza for 2000 Rupees",
        "products": "Jeans",
        "offerType": {
          "id": "otid-909ced9d-0066-4a24-96d4-5f924cc7e6b6",
          "name": "Bundle offer"
        },
        "user": {
          "id": "uid-73cdfa91-471e-46d4-a428-f7912cda7f46",
          "name": "Perera",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        },
        "requestedOn": {
          "milliseconds": 1633342358839,
          "displayDate": "04 Oct 2021",
          "displayDateTime": "04 Oct 2021, 03:42 PM",
          "displayText": "25 minutes ago"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        }
      },
      {
        "note": "User Ask we Get more pizza for 2000 Rupees",
        "products": "T shirt",
        "offerType": {
          "id": "otid-909ced9d-0066-4a24-96d4-5f924cc7e6b6",
          "name": "Bluk Only"
        },
        "user": {
          "id": "uid-73cdfa91-471e-46d4-a428-f7912cda7f46",
          "name": "Achini",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        },
        "requestedOn": {
          "milliseconds": 1633342358839,
          "displayDate": "05 Oct 2021",
          "displayDateTime": "04 Oct 2021, 03:42 PM",
          "displayText": "25 minutes ago"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        }
      },
      {
        "note": "User Ask we Get more pizza for 2000 Rupees",
        "products": "Skirt",
        "offerType": {
          "id": "otid-909ced9d-0066-4a24-96d4-5f924cc7e6b6",
          "name": "Single product"
        },
        "user": {
          "id": "uid-73cdfa91-471e-46d4-a428-f7912cda7f46",
          "name": "Nimal",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        },
        "requestedOn": {
          "milliseconds": 1633342358839,
          "displayDate": "07 Oct 2021",
          "displayDateTime": "04 Oct 2021, 03:42 PM",
          "displayText": "25 minutes ago"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        }
      },
      {
        "note": "User Ask we Get more pizza for 2000 Rupees",
        "products": "Frock",
        "offerType": {
          "id": "otid-909ced9d-0066-4a24-96d4-5f924cc7e6b6",
          "name": "Bluk Only"
        },
        "user": {
          "id": "uid-73cdfa91-471e-46d4-a428-f7912cda7f46",
          "name": "John",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        },
        "requestedOn": {
          "milliseconds": 1633342358839,
          "displayDate": "04 Oct 2021",
          "displayDateTime": "04 Oct 2021, 03:42 PM",
          "displayText": "25 minutes ago"
        },
        "brand": {
          "id": "bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
          "name": "Nike"
        },
        "category": {
          "id": "cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
          "name": "NewYear"
        },
        "merchant": {
          "id": "uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
          "name": "Kelly Felder",
          "imageUrl": "https://objects-qpon-dev.s3.ap-southeast-1.amazonaws.com/fid-fb2688ab-4d44-4780-849a-4b3852964a38.png",
        }
      },
    ]
  },
  summeryForDealRequestsListForCombination: {
    "noOfRequests":5,
    "brand":{
      "id":"bid-8cb9de54-7fff-4da5-a161-a8c028b32656",
      "name":"Nike"
    },
    "category":{
      "id":"cid-7dd2bf85-991b-433b-82a7-7709fd3f3bef",
      "name":"NewYear"
    },
    "merchant":{
      "id":"uid-3b6e6f2e-1b4c-46c1-9166-972fd5d847e8",
      "name":"Kelly Felder",
      "imageUrl":null
    }
  },
  audienceReachDetailedReportForDeal: {

    "totalItems":2,

    "totalPages":1,

    "page":0,

    "size":250,

    "views":[

      {

        "deal":{

          "id":"did-03e18f85-c489-47d8-89f2-9079594f232bc",

          "title":"Buy & get more",

          "coverImage":"http://www.msn.com ",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Brandix",

          "imageUrl":"www.google.com/image",

          "joinedOn":{

            "milliseconds":1631194573000,

            "displayDate":"09 Sep 2021",

            "displayDateTime":"09 Sep 2021, 07:06 PM",

            "displayText":"Joined on 09 Sep 2021"

          }

        },

        "viewCount":5,

        "displayDate":"1st week - Nov 2021"

      },

      {

        "deal":{

          "id":"did-qawe8f85-c489-47d8-89f2-9079594f2cdcd",

          "title":"Buy one get one",

          "coverImage":"http://www.msn.com ",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-vbr3ecc5-98a9-4664-9ad0-e22b0e2feczq",

          "businessName":"Barista",

          "imageUrl":"www.google.com/image",

          "joinedOn":{

            "milliseconds":1631194573000,

            "displayDate":"09 Sep 2021",

            "displayDateTime":"09 Sep 2021, 07:06 PM",

            "displayText":"Joined on 09 Sep 2021"

          }

        },

        "viewCount":10,

        "displayDate":"2nd week - Nov 2021"

      },
      {

        "deal":{

          "id":"did-qawe8f85-c489-47d8-89f2-9079594f2cdcd",

          "title":"Buy one get one",

          "coverImage":"http://www.msn.com ",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-vbr3ecc5-98a9-4664-9ad0-e22b0e2feczq",

          "businessName":"Barista",

          "imageUrl":"www.google.com/image",

          "joinedOn":{

            "milliseconds":1631194573000,

            "displayDate":"09 Sep 2021",

            "displayDateTime":"09 Sep 2021, 07:06 PM",

            "displayText":"Joined on 09 Sep 2021"

          }

        },

        "viewCount":15,

        "displayDate":"3rd week - Nov 2021"

      }

    ]

  },
  audienceReachSummeryReportForDeals: {

    "totalItems":2,

    "totalPages":1,

    "page":0,

    "size":250,

    "views":[

      {

        "deal":{

          "id":"did-03e18f85-c489-47d8-89f2-9079594f232bc",

          "title":"Buy & get more",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Brandix",

          "approvalStatus":"APPROVED",

          "imageUrl":"www.google.com/image"

        },

        "totalViewCount":30

      },

      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Buy one get one",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-807580ec-3f52-4f58-bb21-45de3bc7142a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Odel",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":60

      },

      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Aurudu Deal",

          "coverImage":"https://4.bp.blogspot.com/-3c3x_6rJWiM/WrsuGE6mF6I/AAAAAAAABRQ/JSvpG4v6f8E5h_FU-UWfDdXKjjGQ6Jx-wCLcBGAs/s1600/Ira%2Bdeviyo.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Newyear Deal",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":50

      },

      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Festival Deal",

          "coverImage":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJvhDQmeR0sHTDQHibIXg1CA2jlf-E6DiDyFAz_k1yzRG9uiOdYXO1v3PzfGUuCVFG9Kk&usqp=CAU",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Super Deal",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":20

      },

      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Chirstmas Offer",

          "coverImage":"https://cdn4.vectorstock.com/i/1000x1000/04/43/christmas-background-merry-xmas-sale-holiday-web-vector-27080443.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Barista",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":10

      },
      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"It is coffee time",

          "coverImage":"https://www.healthifyme.com/blog/wp-content/uploads/2019/09/Black-coffee-feature-image.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Barista",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":50

      },
      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Stylish Deal",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-807580ec-3f52-4f58-bb21-45de3bc7142a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Odel",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":80

      },
      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Comfort shoes",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-807580ec-3f52-4f58-bb21-45de3bc7142a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Odel",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":70

      },
      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Buy one get one",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-807580ec-3f52-4f58-bb21-45de3bc7142a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Odel",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":20

      },
      {

        "deal":{

          "id":"did-abc18f85-c489-47d8-89f2-9079594f2efc",

          "title":"Buy one get one",

          "coverImage":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-807580ec-3f52-4f58-bb21-45de3bc7142a.jpg",

          "activeStatus":"ACTIVE"

        },

        "merchant":{

          "id":"uid-5a81dcc5-98a9-4664-9ad0-e22b0e23313c",

          "businessName":"Odel",

          "approvalStatus":"APPROVED",

          "imageUrl":"https://objects-qpon-qa.s3.ap-southeast-1.amazonaws.com/fid-628da09f-c0fc-482d-bdfc-b46b9b9c444a.jpg"

        },

        "totalViewCount":0

      }

    ]

  },
};
