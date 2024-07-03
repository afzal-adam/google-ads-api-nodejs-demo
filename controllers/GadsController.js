const { GoogleAdsApi } = require("google-ads-api");

// Function to list campaigns
async function listCampaigns(customerId, token) {
  try {
    console.log("Creating GoogleAdsApi client"); // Log client creation step
    // Create a new GoogleAdsApi client instance
    const client = new GoogleAdsApi({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      developer_token: process.env.DEV_TOKEN,
    });

    console.log("Creating customer instance"); // Log customer creation step
    // Create a customer instance with the provided customer ID and refresh token
    const customer = client.Customer({
      customer_id: customerId,
      refresh_token: token?.refresh_token,
    });

    console.log("Defining query to select campaign data"); // Log query definition step
    // Define the query to select campaign data
    const query = `
      SELECT 
        campaign.name, 
        campaign_budget.amount_micros, 
        metrics.all_conversions, 
        metrics.conversions, 
        metrics.clicks, 
        metrics.cost_per_conversion, 
        metrics.cost_per_all_conversions, 
        metrics.average_cost, 
        metrics.impressions, 
        metrics.ctr, 
        metrics.cost_micros, 
        campaign.id, 
        metrics.average_cpc, 
        campaign.optimization_score 
      FROM campaign 
      WHERE 
        campaign.status = 'ENABLED'
    `;

    console.log("Executing query to list campaigns"); // Log query execution step
    // Execute the query to list campaigns and return the response
    const response = await customer.query(query);
    console.log("Campaigns fetched successfully"); // Log successful fetch
    return response;
  } catch (error) {
    console.error("Failed to fetch campaigns:", error); // Log error
  }
}

// Function to list ad groups
const listAdsGroups = async (customerId, token) => {
  try {
    console.log("Creating GoogleAdsApi client"); // Log client creation step
    // Create a new GoogleAdsApi client instance
    const client = new GoogleAdsApi({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      developer_token: process.env.DEV_TOKEN,
    });

    console.log("Creating customer instance"); // Log customer creation step
    // Create a customer instance with the provided customer ID and refresh token
    const customer = client.Customer({
      customer_id: customerId,
      refresh_token: token?.refresh_token,
    });

    console.log("Defining query to select ad group data"); // Log query definition step
    // Define the query to select ad group data
    const query = `
      SELECT 
        ad_group.name, 
        campaign.name, 
        metrics.all_conversions, 
        metrics.conversions, 
        metrics.clicks, 
        metrics.cost_per_conversion, 
        metrics.cost_per_all_conversions, 
        metrics.impressions, 
        metrics.ctr, 
        metrics.average_cost, 
        ad_group.status, 
        ad_group.id 
      FROM ad_group 
      WHERE 
        ad_group.status = 'ENABLED' 
        AND campaign.status = 'ENABLED' 
      ORDER BY 
        metrics.conversions DESC 
    `;

    console.log("Executing query to list ad groups"); // Log query execution step
    // Execute the query to list ad groups and return the response
    const response = await customer.query(query);
    console.log("Ad Groups fetched successfully"); // Log successful fetch
    return response;
  } catch (error) {
    console.error("Failed to fetch Ad Groups:", error); // Log error
  }
};

// Function to get formatted campaign data
const getFormattedCampaignData = async (customerId, token, dateRange) => {
  console.log("Fetching campaigns"); // Log fetch campaigns step
  // Fetch campaigns using the listCampaigns function
  const campaigns = await listCampaigns(customerId, token);

  console.log("Fetching ad groups"); // Log fetch ad groups step
  // Fetch ad groups using the listAdsGroups function
  const adGroups = await listAdsGroups(customerId, token);

  console.log("Formatting and combining campaign and ad group data"); // Log formatting step
  // Format and combine campaign and ad group data
  const campaignData = campaigns.map((campaign) => {
    // Filter ad groups that belong to the current campaign
    const campaignAdGroups = adGroups.filter(
      (adGroup) => adGroup.campaign.name === campaign.campaign.name
    );

    // Map ad group data to the desired format
    const adGroupData = campaignAdGroups.map((adGroup) => {
      return {
        adGroupName: adGroup.ad_group.name,
        id: adGroup.ad_group.id,
        metrics: adGroup.metrics,
      };
    });

    // Return the formatted campaign data
    return {
      campaignName: campaign.campaign.name,
      id: campaign?.campaign?.id,
      metrics: campaign.metrics,
      adGroups: adGroupData,
    };
  });

  console.log("Returning formatted campaign data"); // Log return step
  // Return the formatted campaign data
  return campaignData;
};

module.exports = {
  listCampaigns,
  listAdsGroups,
  getFormattedCampaignData,
};
