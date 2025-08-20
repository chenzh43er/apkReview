import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm';

const supabase = createClient(
    'https://qnsmrvryhcgqrnaygdfw.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuc21ydnJ5aGNncXJuYXlnZGZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDk2MTgsImV4cCI6MjA3MTA4NTYxOH0.RmQfv23CaqLjinVZVNWFvkVHbAJjs176r_wAlygynDg'
);

export async function queryAppsByType(type) {
    try {
        //console.log(`正在查询类型为 "${type}" 的应用...`);

        const { data, error } = await supabase
            .from('apps_flat')
            .select('*')
            .eq('type', type);

        if (error) {
            console.error('Supabase 查询错误:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('查询过程中出错:', error);
        return { data: null, error };
    }
}

export async function queryAppsByAlias(alias) {
    try {
        //console.log(`正在查询 alias = "${alias}" 的应用...`);

        const { data, error } = await supabase
            .from('apps_flat')
            .select('*')
            .eq('alias', alias);

        if (error) {
            console.error('Supabase 查询错误:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        console.error('查询过程中出错:', err);
        return { data: null, error: err };
    }
}

export async function queryTopRankedApps(limit = 10) {
    try {
        console.log(`正在查询 rankapp != 0 的应用，按 rankapp 排序，限制 ${limit} 条...`);

        const { data, error } = await supabase
            .from('apps_flat')
            .select('*')
            .neq('rankapp', 0)       // rankapp != 0
            .order('rankapp', { ascending: true }) // 按 rankapp 升序
            .limit(limit);           // 限制返回条数

        if (error) {
            console.error('Supabase 查询错误:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (err) {
        console.error('查询过程中出错:', err);
        return { data: null, error: err };
    }
}

export async function queryAppsByTypeWithRank(type, limit = 12) {
    try {
        console.log(`正在查询 type="${type}" 的应用，按 rankapp 排序，限制 ${limit} 条...`);

        const { data, error } = await supabase
            .from('apps_flat')
            .select('*')
            .eq('type', type)                     // where type = ""
            .order('rankapp', { ascending: true }) // order by rankapp ASC
            .limit(limit);                        // limit 10

        if (error) {
            console.error('Supabase 查询错误:', error);
            return { dataType: null, error };
        }

        return { dataType:data, error: null };
    } catch (err) {
        console.error('查询过程中出错:', err);
        return { dataType: null, error: err };
    }
}

export async function queryAppsByVerWithPagination(ver = "app", page = 1, pageSize = 20) {
    try {
        // 根据 ver 确定排序字段
        let rankField = null;
        if (ver === "app") {
            rankField = "rankapp";
        } else if (ver === "game") {
            rankField = "rankgame";
        } else {
            throw new Error(`不支持的 ver 类型: ${ver}`);
        }

        console.log(`正在查询 ver="${ver}" 且 ${rankField} != 0 的应用，第 ${page} 页，每页 ${pageSize} 条...`);

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
            .from('apps_flat')
            .select('*', { count: 'exact' })     // 获取总条数
            .eq('ver', ver)                      // where ver = ?
            .neq(rankField, 0)                   // and rankX != 0
            .order(rankField, { ascending: true }) // order by rankX
            .range(from, to);                    // limit + offset

        if (error) {
            console.error('Supabase 查询错误:', error);
            return { data: null, error };
        }

        // 计算总页数
        const totalPages = Math.ceil(count / pageSize);

        return { data, totalPages, count, error: null };
    } catch (err) {
        console.error('查询过程中出错:', err);
        return { data: null, error: err };
    }
}



