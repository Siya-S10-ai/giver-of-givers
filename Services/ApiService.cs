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
            TotalDonations = 1247,
            FundedProjects = 89,
            LivesImpacted = 15632
        };
    }

    public async Task<List<DonationDto>> GetRecentDonationsAsync()
    {
        // Mock data for now
        await Task.Delay(100);
        return new List<DonationDto>
        {
            new() { DonorName = "Anonymous", Amount = 500, Type = "Food Aid", Message = "Keep up the great work!", CreatedAt = DateTime.Now.AddDays(-1) },
            new() { DonorName = "John D.", Amount = 200, Type = "Medical Supplies", CreatedAt = DateTime.Now.AddDays(-2) },
            new() { DonorName = "Sarah M.", Amount = 1000, Type = "Disaster Relief", CreatedAt = DateTime.Now.AddDays(-3) }
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

    public async Task<UserProfileDto?> GetUserProfileAsync(string userId)
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

    public async Task<UserProfileDto> UpdateUserProfileAsync(string userId, UserProfileDto profile)
    {
        // Mock update
        await Task.Delay(500);
        return profile;
    }

    public async Task<ReporterStatsDto> GetReporterStatsAsync(string userId)
    {
        await Task.Delay(300);
        return new ReporterStatsDto
        {
            TotalReports = 12,
            VerifiedReports = 10
        };
    }

    public async Task<VolunteerStatsDto> GetVolunteerStatsAsync(string userId)
    {
        await Task.Delay(300);
        return new VolunteerStatsDto
        {
            CompletedTasks = 25,
            TotalHours = 150
        };
    }
}