using Microsoft.JSInterop;

namespace GiftOfGivers.Client.Services
{
    public interface IMobileService
    {
        Task<bool> IsMobileAsync();
        Task InitializeAsync();
        event Action<bool>? OnMobileStateChanged;
    }

    public class MobileService : IMobileService, IDisposable
    {
        private const int MobileBreakpoint = 768;
        private readonly IJSRuntime _jsRuntime;
        private IJSObjectReference? _jsModule;
        private DotNetObjectReference<MobileService>? _objRef;
        private bool _isMobile;

        public event Action<bool>? OnMobileStateChanged;

        public MobileService(IJSRuntime jsRuntime)
        {
            _jsRuntime = jsRuntime;
            _objRef = DotNetObjectReference.Create(this);
        }

        public async Task InitializeAsync()
        {
            try
            {
                // Initialize with current window width
                _isMobile = await _jsRuntime.InvokeAsync<bool>("eval", $"window.innerWidth < {MobileBreakpoint}");
                
                // Set up resize listener
                await _jsRuntime.InvokeVoidAsync("eval", $@"
                    window.mobileServiceListener = () => {{
                        const isMobile = window.innerWidth < {MobileBreakpoint};
                        DotNet.invokeMethodAsync('GiftOfGivers.Client', 'UpdateMobileState', isMobile);
                    }};
                    window.addEventListener('resize', window.mobileServiceListener);
                ");
            }
            catch (Exception ex)
            {
                // Handle initialization errors gracefully
                Console.WriteLine($"MobileService initialization error: {ex.Message}");
                _isMobile = false;
            }
        }

        public Task<bool> IsMobileAsync()
        {
            return Task.FromResult(_isMobile);
        }

        [JSInvokable("UpdateMobileState")]
        public static async Task UpdateMobileState(bool isMobile)
        {
            // This would need to be handled through a singleton service or event system
            // For now, we'll use a simple static approach
        }

        [JSInvokable]
        public void UpdateMobileStateInstance(bool isMobile)
        {
            if (_isMobile != isMobile)
            {
                _isMobile = isMobile;
                OnMobileStateChanged?.Invoke(_isMobile);
            }
        }

        public void Dispose()
        {
            try
            {
                _jsRuntime.InvokeVoidAsync("eval", @"
                    if (window.mobileServiceListener) {
                        window.removeEventListener('resize', window.mobileServiceListener);
                        delete window.mobileServiceListener;
                    }
                ");
            }
            catch
            {
                // Ignore disposal errors
            }

            _objRef?.Dispose();
        }
    }
}