namespace GiftOfGivers.Client.Helpers
{
    public static class Utils
    {
        /// <summary>
        /// Combines CSS class names using a simple concatenation approach
        /// This is a C# equivalent of the TypeScript cn() utility function
        /// </summary>
        /// <param name="classes">Array of class names to combine</param>
        /// <returns>Combined class string</returns>
        public static string Cn(params string?[] classes)
        {
            var validClasses = classes
                .Where(c => !string.IsNullOrWhiteSpace(c))
                .Select(c => c!.Trim());

            return string.Join(" ", validClasses);
        }

        /// <summary>
        /// Conditionally includes a CSS class
        /// </summary>
        /// <param name="condition">Condition to check</param>
        /// <param name="classWhenTrue">Class to include when condition is true</param>
        /// <param name="classWhenFalse">Class to include when condition is false (optional)</param>
        /// <returns>The appropriate class string</returns>
        public static string ConditionalClass(bool condition, string classWhenTrue, string classWhenFalse = "")
        {
            return condition ? classWhenTrue : classWhenFalse;
        }

        /// <summary>
        /// Combines base classes with conditional classes
        /// </summary>
        /// <param name="baseClasses">Base CSS classes</param>
        /// <param name="conditionalClasses">Dictionary of condition->class pairs</param>
        /// <returns>Combined class string</returns>
        public static string CombineClasses(string baseClasses, Dictionary<bool, string> conditionalClasses)
        {
            var allClasses = new List<string> { baseClasses };
            
            foreach (var kvp in conditionalClasses)
            {
                if (kvp.Key && !string.IsNullOrWhiteSpace(kvp.Value))
                {
                    allClasses.Add(kvp.Value);
                }
            }

            return Cn(allClasses.ToArray());
        }
    }
}