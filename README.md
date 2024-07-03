# Using Google Ads API with Node.js

This repository provides a guide and example implementation for using the Google Ads API with Node.js. It covers setup, authentication, and data retrieval.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine.
- Google Cloud Platform (GCP) project with access to Google Ads API enabled.
- `client_id`, `client_secret`, and `developer_token` obtained from GCP.

## Getting Started

Follow these steps to set up the project and run the example:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```


### 2. Install Dependencies

```bash
npm install
```

### 3. Obtain Google Ads API Credentials

#### Client Account Credentials

1. **Create OAuth2 Credentials:**
   - Go to GCP Console > API & Services > Credentials.
   - Create OAuth2 credentials (OAuth client ID) for your application.
   - Note down `client_id` and `client_secret`.




### 4. Configure Environment Variables

Create a .env file in the root directory and add the following: (DEV Token is optional)

```bash
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
DEV_TOKEN=your_developer_token
```



### 5. Run the Example

Start the server:

```bash
nodemon app.js
```


### 6. API Endpoints Usage


Get Authentication URL


```bash
POST /getAuthUrl

```

Fetch Google Ads Report

```bash
POST /google-ads-report
Content-Type: application/json

{
  "gUserDataLocal": {
    "googleTokens": {
      "access_token": "your_access_token",
      "expiry_date": "token_expiry_date"
    }
  },
  "dateRange": "last_7_days"
}

# Output Sample Response:

[
    {
        "campaignName": "Campaign A",
        "id": 1234567890,
        "metrics": {
            "clicks": 45,
            "conversions": 3,
            "cost_micros": 500000000,
            "cost_per_all_conversions": 166666666,
            "cost_per_conversion": 166666666,
            "ctr": 0.075,
            "all_conversions": 3,
            "average_cost": 11111111.111111112,
            "average_cpc": 11111111.111111112,
            "impressions": 600
        },
        "adGroups": [
            {
                "adGroupName": "AdGroup 1",
                "id": 2345678901,
                "metrics": {
                    "clicks": 10,
                    "conversions": 1,
                    "cost_per_all_conversions": 50000000,
                    "cost_per_conversion": 50000000,
                    "ctr": 0.05,
                    "all_conversions": 1,
                    "average_cost": 5000000,
                    "impressions": 200
                }
            },
            {
                "adGroupName": "AdGroup 2",
                "id": 3456789012,
                "metrics": {
                    "clicks": 20,
                    "conversions": 1,
                    "cost_per_all_conversions": 100000000,
                    "cost_per_conversion": 100000000,
                    "ctr": 0.1,
                    "all_conversions": 1,
                    "average_cost": 5000000,
                    "impressions": 200
                }
            },
            {
                "adGroupName": "AdGroup 3",
                "id": 4567890123,
                "metrics": {
                    "clicks": 15,
                    "conversions": 1,
                    "cost_per_all_conversions": 66666666,
                    "cost_per_conversion": 66666666,
                    "ctr": 0.075,
                    "all_conversions": 1,
                    "average_cost": 4444444.444444445,
                    "impressions": 200
                }
            }
        ]
    },
    {
        "campaignName": "Campaign B",
        "id": 9876543210,
        "metrics": {
            "clicks": 90,
            "conversions": 5,
            "cost_micros": 900000000,
            "cost_per_all_conversions": 180000000,
            "cost_per_conversion": 180000000,
            "ctr": 0.1,
            "all_conversions": 5,
            "average_cost": 10000000,
            "average_cpc": 10000000,
            "impressions": 900
        },
        "adGroups": [
            {
                "adGroupName": "AdGroup 1",
                "id": 8765432109,
                "metrics": {
                    "clicks": 30,
                    "conversions": 2,
                    "cost_per_all_conversions": 150000000,
                    "cost_per_conversion": 150000000,
                    "ctr": 0.1,
                    "all_conversions": 2,
                    "average_cost": 5000000,
                    "impressions": 300
                }
            },
            {
                "adGroupName": "AdGroup 2",
                "id": 7654321098,
                "metrics": {
                    "clicks": 30,
                    "conversions": 1,
                    "cost_per_all_conversions": 300000000,
                    "cost_per_conversion": 300000000,
                    "ctr": 0.1,
                    "all_conversions": 1,
                    "average_cost": 10000000,
                    "impressions": 300
                }
            },
            {
                "adGroupName": "AdGroup 3",
                "id": 6543210987,
                "metrics": {
                    "clicks": 30,
                    "conversions": 2,
                    "cost_per_all_conversions": 150000000,
                    "cost_per_conversion": 150000000,
                    "ctr": 0.1,
                    "all_conversions": 2,
                    "average_cost": 5000000,
                    "impressions": 300
                }
            }
        ]
    }
]


```


### 6. Resources / References

1. Google Ads Query Builder(Can be used to Generate the GAQ )
2. Google ads api [Node Package](https://www.npmjs.com/package/google-ads-api).

## Disclaimer
This code repository is provided as a helpful guide for connecting to the Google Ads API using Node.js. It is not an official implementation and does not guarantee functionality or compliance with Google Ads API guidelines. The creators of this repository do not claim ownership or endorsement by Google. Use this code at your own risk and refer to the official Google Ads API documentation for comprehensive and authoritative guidance.








   

