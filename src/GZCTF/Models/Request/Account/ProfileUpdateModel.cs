using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Serialization;

namespace GZCTF.Models.Request.Account;

/// <summary>
/// 基本账号信息更改
/// </summary>
public class ProfileUpdateModel
{
    /// <summary>
    /// 用户名
    /// </summary>
    [MinLength(3, ErrorMessage = "用户名过短")]
    [MaxLength(15, ErrorMessage = "用户名过长")]
    public string? UserName { get; set; }

    /// <summary>
    /// 描述
    /// </summary>
    [MaxLength(55, ErrorMessage = "描述过长")]
    public string? Bio { get; set; }

    /// <summary>
    /// 手机号
    /// </summary>
    //[Phone(ErrorMessage = "手机号格式错误")]
    [RegularExpression(@"^1[0-9]{10}$", ErrorMessage = "手机号格式应为11位中国大陆手机")]
    [Required(ErrorMessage = "手机号为必填项")]
    public string? Phone { get; set; }

    /// <summary>
    /// 真实姓名
    /// </summary>
    [MaxLength(15, ErrorMessage = "真实姓名过长")] // 考虑新疆等名字
    [MinLength(2, ErrorMessage ="真实姓名过短")]
    [RegularExpression(@"[\u4e00-\u9fa5A-Za-z]+", ErrorMessage = "真实姓名仅应为汉字与英文字母")]
    [Required(ErrorMessage = "真实姓名为必填项")]
    public string? RealName { get; set; }

    /// <summary>
    /// 学工号
    /// </summary>
    //[MaxLength(24, ErrorMessage = "学工号过长")]
    [RegularExpression(@"[0-9]{10}",ErrorMessage = "学工号应为10位数字")]
    [Required(ErrorMessage = "学工号为必填项")]
    public string? StdNumber { get; set; }
}
