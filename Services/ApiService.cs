using System.Net.Http.Json;
using GiftOfGivers.Shared.DTOs;

namespace GiftOfGivers.Client.Services;

public class ApiService : IApiService
{
    private readonly HttpClient _httpClient;

    public ApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<DonationStatsDto> GetDonationStatsAsync()
    {
        // Mock data for now
        await Task.Delay(100);
        return new DonationStatsDto
        {
            TotalDonations = 2500000,
            ProjectsFunded = 180,
            LivesImpacted = 45000
        };
    }

    public async Task<List<DonationDto>> GetRecentDonationsAsync()
    {
        // Mock data for now
        await Task.Delay(100);
        return new List<DonationDto>
        {
            new() { DonorName = "Anonymous", Amount = 500, Date = DateTime.Now.AddDays(-1), Type = "Food Aid" },
            new() { DonorName = "John D.", Amount = 200, Date = DateTime.Now.AddDays(-2), Type = "Medical Supplies" },
            new() { DonorName = "Sarah M.", Amount = 1000, Date = DateTime.Now.AddDays(-3), Type = "Disaster Relief" }
        };
    }

    public async Task<DonationResult> ProcessDonationAsync(DonationFormDto donation)
    {
        // Mock processing
        await Task.Delay(2000);
        return new DonationResult
        {
            Success = true,
            Message = "Thank you for your generous donation!"
        };
    }

    public async Task<UserProfileDto> GetUserProfileAsync(string userId)
    {
        // Mock data
        await Task.Delay(100);
        return new UserProfileDto
        {
            Id = userId,
            FirstName = "John",
            LastName = "Doe",
            Email = "john.doe@example.com",
            Role = "Volunteer",
            CreatedAt = DateTime.Now.AddMonths(-6)
        };
    }

    public async Task<bool> UpdateUserProfileAsync(string userId, UserProfileDto profile)
    {
        // Mock update
        await Task.Delay(500);
        return true;
    }
}