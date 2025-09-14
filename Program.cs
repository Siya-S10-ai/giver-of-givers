using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.EntityFrameworkCore;
using GiftOfGivers.Client.Services;
using GiftOfGivers.Client.AzureSQL;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");

// Add services
builder.Services.AddScoped<IToastService, ToastService>();
builder.Services.AddScoped<IMobileService, MobileService>();
builder.Services.AddScoped<IApiService, ApiService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Add Azure SQL services
builder.Services.AddDbContext<AzureDbContext>(options =>
{
    // Configure your connection string here
    options.UseSqlServer("your-connection-string-here");
});
builder.Services.AddScoped<IAzureService, AzureService>();

// Add HttpClient
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Add logging
builder.Services.AddLogging();

await builder.Build().RunAsync();