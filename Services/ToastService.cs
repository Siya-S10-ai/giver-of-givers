namespace GiftOfGivers.Client.Services
{
    public enum ToastType
    {
        Default,
        Success,
        Warning,
        Destructive
    }

    public class ToastMessage
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? Title { get; set; }
        public string? Description { get; set; }
        public ToastType Type { get; set; } = ToastType.Default;
        public bool IsVisible { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int Duration { get; set; } = 5000; // 5 seconds default
    }

    public interface IToastService
    {
        event Action? OnToastsUpdated;
        IReadOnlyList<ToastMessage> Toasts { get; }
        
        void ShowToast(string? title = null, string? description = null, ToastType type = ToastType.Default, int duration = 5000);
        void ShowSuccess(string? title = null, string? description = null, int duration = 5000);
        void ShowWarning(string? title = null, string? description = null, int duration = 5000);
        void ShowError(string? title = null, string? description = null, int duration = 5000);
        void DismissToast(string toastId);
        void DismissAll();
    }

    public class ToastService : IToastService, IDisposable
    {
        private readonly List<ToastMessage> _toasts = new();
        private readonly Dictionary<string, Timer> _toastTimers = new();
        private const int MaxToasts = 3;

        public event Action? OnToastsUpdated;
        public IReadOnlyList<ToastMessage> Toasts => _toasts.AsReadOnly();

        public void ShowToast(string? title = null, string? description = null, ToastType type = ToastType.Default, int duration = 5000)
        {
            var toast = new ToastMessage
            {
                Title = title,
                Description = description,
                Type = type,
                Duration = duration
            };

            // Remove oldest toasts if we exceed the limit
            while (_toasts.Count >= MaxToasts)
            {
                var oldestToast = _toasts[0];
                DismissToast(oldestToast.Id);
            }

            _toasts.Add(toast);

            // Auto-dismiss after duration
            if (duration > 0)
            {
                var timer = new Timer(_ => DismissToast(toast.Id), null, duration, Timeout.Infinite);
                _toastTimers[toast.Id] = timer;
            }

            OnToastsUpdated?.Invoke();
        }

        public void ShowSuccess(string? title = null, string? description = null, int duration = 5000)
        {
            ShowToast(title, description, ToastType.Success, duration);
        }

        public void ShowWarning(string? title = null, string? description = null, int duration = 5000)
        {
            ShowToast(title, description, ToastType.Warning, duration);
        }

        public void ShowError(string? title = null, string? description = null, int duration = 5000)
        {
            ShowToast(title, description, ToastType.Destructive, duration);
        }

        public void DismissToast(string toastId)
        {
            var toast = _toasts.FirstOrDefault(t => t.Id == toastId);
            if (toast != null)
            {
                _toasts.Remove(toast);
                
                if (_toastTimers.TryGetValue(toastId, out var timer))
                {
                    timer.Dispose();
                    _toastTimers.Remove(toastId);
                }

                OnToastsUpdated?.Invoke();
            }
        }

        public void DismissAll()
        {
            _toasts.Clear();
            
            foreach (var timer in _toastTimers.Values)
            {
                timer.Dispose();
            }
            _toastTimers.Clear();

            OnToastsUpdated?.Invoke();
        }

        public void Dispose()
        {
            foreach (var timer in _toastTimers.Values)
            {
                timer.Dispose();
            }
            _toastTimers.Clear();
            _toasts.Clear();
        }
    }
}