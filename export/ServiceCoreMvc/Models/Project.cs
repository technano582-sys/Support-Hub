namespace ServiceCore.Models
{
    public class Project
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Progress { get; set; }
        public string Due { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Team { get; set; } = new();
    }
}
