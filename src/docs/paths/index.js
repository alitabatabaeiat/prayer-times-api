module.exports = {
  paths: {
    "/prayer-times": {
      get: {
        description: "Lists a day's prayer times",
        parameters: [
          {
            name: "latitude",
            in: "query",
            schema: {
              $ref: "#/components/schemas/latitude",
            },
            required: true,
            description: "The latitude of a location",
          },
          {
            name: "longitude",
            in: "query",
            schema: {
              $ref: "#/components/schemas/longitude",
            },
            required: true,
            description: "The longitude of a location",
          },
          {
            name: "calculationMethod",
            in: "query",
            schema: {
              type: "string",
              example: "Tehran",
            },
            required: false,
            description: "The calculation method to use",
          },
          {
            name: "date",
            in: "query",
            schema: {
              type: "string",
              example: "2021-10-15",
            },
            required: false,
            description: "The date of when the prayer times are requested",
          },
        ],
        responses: {
          200: {
            description: "A sample successfull response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      description: "The response's status",
                      example: "success",
                    },
                    data: {
                      type: "object",
                      properties: {
                        date: {
                          type: "string",
                          description:
                            "The date which calculated prayer times are related to",
                          example: "2021-11-20",
                        },
                        calculationMethod: {
                          type: "string",
                          description:
                            "The calculation method that used for prayer times calculation",
                          example: "NorthAmerica",
                        },
                        prayerTimes: {
                          type: "object",
                          description: "Prayer times object",
                          properties: {
                            fajr: {
                              type: "string",
                              example: "10:38+00:00",
                            },
                            sunrise: {
                              type: "string",
                              example: "12:17+00:00",
                            },
                            dhuhr: {
                              type: "string",
                              example: "17:03+00:00",
                            },
                            asr: {
                              type: "string",
                              example: "19:27+00:00",
                            },
                            maghrib: {
                              type: "string",
                              example: "22:11+00:00",
                            },
                            isha: {
                              type: "string",
                              example: "23:06+00:00",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/qibla": {
      get: {
        description:
          "Calculate the qibla dircetion based on latitude and longitude",
        parameters: [
          {
            name: "latitude",
            in: "query",
            schema: {
              $ref: "#/components/schemas/latitude",
            },
            required: true,
            description: "The latitude of a location",
          },
          {
            name: "longitude",
            in: "query",
            schema: {
              $ref: "#/components/schemas/longitude",
            },
            required: true,
            description: "The longitude of a location",
          },
        ],
        responses: {
          200: {
            description: "A sample successfull response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      description: "The response's status",
                      example: "success",
                    },
                    data: {
                      type: "object",
                      properties: {
                        qiblaDirection: {
                          type: "number",
                          description: "Qibla's direction",
                          example: 54.58,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/calculation-methods": {
      get: {
        description: "Lists all prayer times' calculation methods",
        parameters: [],
        responses: {
          200: {
            description: "A sample successfull response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      description: "The response's status",
                      example: "success",
                    },
                    data: {
                      type: "object",
                      properties: {
                        calculationMethods: {
                          type: "array",
                          items: {
                            type: "string",
                            description: "A prayer times' calculation method",
                            example: "Turkey",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/coordinates": {
      get: {
        description: "Calculate coordinates of the provided address",
        parameters: [
          {
            name: "address",
            in: "query",
            required: true,
            schema: {
              type: "string",
              example: "2 Chrislea Rd Vaughan Woodbridge, ON, Canada",
            },
            description: "The address of where the coordinates are requested",
          },
        ],
        responses: {
          200: {
            description: "A sample successfull response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      description: "The response's status",
                      example: "success",
                    },
                    data: {
                      type: "object",
                      properties: {
                        coordinates: {
                          type: "array",
                          items: {
                            type: "object",
                            description: "A location details",
                            properties: {
                              latitude: {
                                type: "number",
                                example: 43.64877,
                              },
                              longitude: {
                                type: "number",
                                example: -79.38171,
                              },
                              region: {
                                type: "string",
                                example: "Ontario",
                              },
                              regionCode: {
                                type: "string",
                                example: "ON",
                              },
                              locality: {
                                type: "string",
                                example: "Toronto",
                              },
                              country: {
                                type: "string",
                                example: "Canada",
                              },
                              countryCode: {
                                type: "string",
                                example: "CAN",
                              },
                              label: {
                                type: "string",
                                example: "Toronto, ON, Canada",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
