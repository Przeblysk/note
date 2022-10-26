# Git 随记

## 配置多账号

1. 分别为 [github](https://github.com/) [gitee](https://gitee.com/) 使用命令 `ssh key ssh-keygen -t rsa -C lxjazni7@gmail.com`生成 ssh 文件。分别命名为 `id_rsa_github` 和 `id_rsa_gitee`

2. 上传公钥到(.pub 为结尾的文件内容) [github](https://github.com/) 和 [gitee](https://gitee.com/)

3. 在.ssh 文件下创建 config 文件

```bash
# 配置github.com
Host github.com
    HostName github.com
    IdentityFile /Users/przeblysk/.ssh/id_rsa_github
    PreferredAuthentications publickey
    User przeblysk

# 配置gitee.com
Host gitee.com
    HostName gitee.com
    IdentityFile /Users/przeblysk/.ssh/id_rsa_gitee
    PreferredAuthentications publickey
    User przeblysk
```

4. 测试 `ssh -T git@github.com` `ssh -T git@gitee.com`
